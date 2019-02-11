using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using dateapp.API.Data;
using dateapp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace dateapp.API.Controllers
{
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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _datingService.GetUserById(id);

            var model = _mapper.Map<UserDetailsModel>(user);

            return Ok(model);
        }
    }
}