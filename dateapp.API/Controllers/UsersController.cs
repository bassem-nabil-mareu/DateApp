using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using dateapp.API.Data;
using dateapp.API.Helper;
using dateapp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace dateapp.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivty))]
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController:ControllerBase
    {
        private readonly IDatingRepository _datingService;
        private readonly IMapper _mapper;

        public UsersController(IDatingRepository datingService,
        IMapper mapper)
        {
            _datingService = datingService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _datingService.GetUsers();

            var model = _mapper.Map<IEnumerable<UserListModel>>(users);

            return Ok(model);
        }

        [HttpGet("{id}", Name="GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _datingService.GetUserById(id);

            var model = _mapper.Map<UserDetailsModel>(user);

            return Ok(model);
        }
        
        // update user
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id,UserEditModel model) 
        {
            // check if the passsing id == the user that logged in
            // check if user is the current user that pass token to server 
            if(id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var obj = await _datingService.GetUserById(id);
            obj.Introduction = model.Introduction;
            obj.LookingFor = model.LookingFor;
            obj.Interests = model.Interests;
            obj.City = model.City;
            obj.Country = model.Country;

            //await _mapper.Map(model,obj);

            if(await _datingService.SaveAll())
                return NoContent();

            throw new Exception($"updated error for {id}");    
        }
    }
}