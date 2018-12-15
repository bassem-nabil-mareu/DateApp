using System;
using System.IdentityModel.Tokens.Jwt;
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
            model.username = model.username.ToLower();

            if(await _authRepository.UserExists(model.username))
            {
                return BadRequest("userName Found");
            }

            var user = new User{
                UserName = model.username
            };

            var createUser = await _authRepository.Register(user,model.password);
            
            return StatusCode(201);
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login (LoginModel model)
        {
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

            return Ok(new {
                token = tokenHandler.WriteToken(token)
            });
        }
    }
}