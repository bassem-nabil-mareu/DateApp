using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using dateapp.API.Data;
using dateapp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace dateapp.API.Controllers
{
    [Route("api/[controller]")] 
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;
        private readonly IConfiguration _confg;

        public AuthController(IAuthRepository authRepository,IConfiguration confg)
        {
            _authRepository = authRepository;
            _confg = confg;
        }

        [HttpPost("registerme")]
        public async Task<IActionResult> Register(UserModel model)
        {
            model.UserName = model.UserName.ToLower();

            if(await _authRepository.UserExists(model.UserName))
            {
                return BadRequest("userName Found");
            }

            var user = new User{
                UserName = model.UserName,
                Gender = model.Gender,
                KnownAs = model.KnownAs,
                DateOfBirth = model.DateOfBirth,
                LastActive = DateTime.Now,
                Created = DateTime.Now,
            };

            var createUser = await _authRepository.Register(user,model.Password);
            
            var returnUser = new UserModel {
                UserName = model.UserName,
                Gender = model.Gender,
                KnownAs = model.KnownAs,
                DateOfBirth = model.DateOfBirth,
            };

            return CreatedAtRoute("GetUser", new { controller = "Users", id = createUser.Id }, returnUser);
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login (LoginModel model)
        {
           // throw new Exception("bassem say no");   
            var user = await _authRepository.Login(model.userName.ToLower(),model.password);

            if(user==null)
                return Unauthorized();

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                new Claim(ClaimTypes.Name,user.UserName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8
                    .GetBytes(_confg.GetSection("Appsetting:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var userModel = new UserListModel();
            userModel.Id = user.Id;
            userModel.UserName = user.UserName;
            userModel.PhotoURL = user.Photos.Where(s=>s.IsMain==true).Select(o=>o.Url).FirstOrDefault();

            return Ok(new {
                token = tokenHandler.WriteToken(token),
                user = userModel
            });
        }
    }
}