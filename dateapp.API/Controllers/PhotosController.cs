using AutoMapper;
using dateapp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using dateapp.API.Models;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using System.Net.Http.Headers;
using System.Linq;
using System;

namespace dateapp.API.Controllers
{
    [Authorize]
    [Route("api/users/{userId}/photos")]
    [ApiController]
    public class PhotosController:ControllerBase
    {
        private readonly IDatingRepository _datingService;
        private IHostingEnvironment _hostingEnvironment;
        private readonly IMapper _mapper;
        public PhotosController(IDatingRepository datingService,
        IMapper mapper,IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
            _datingService = datingService;
            _mapper = mapper;
        }

        [HttpGet("{id}",Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photo = await _datingService.GetPhotoById(id);

            //var image = System.IO.File.OpenRead("http://localhost:5000/UploadFiles/"+ photo.Url);
            //return File(image, "image/jpeg");
            return Ok( photo.Url);
        }
        [HttpPost]
        public async Task<IActionResult> AddPhotosForUser(int userId,
        [FromForm]PhotoUploadModel model)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user = await _datingService.GetUserById(userId);

            try
            {
                //var file = Request.Form.Files[0];
                var file = model.File;
                string folderName = "images";
                string webRootPath = _hostingEnvironment.WebRootPath;
                string newPath = Path.Combine(webRootPath, folderName);
                if (!Directory.Exists(newPath))
                {
                    Directory.CreateDirectory(newPath);
                }
                if (file.Length > 0)
                {
                    // string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    string DbfileName = Path.GetRandomFileName();
                    DbfileName = DbfileName.Replace(".", ""); // Remove period.
                    
                    string fileNameExtention = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    string extention = Path.GetExtension(fileNameExtention);
                    
                    string fullPath = Path.Combine(newPath, DbfileName+extention);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    
                    var photo = new Photo();
                    if(!user.Photos.Any(q=>q.IsMain))
                        photo.IsMain = true;
                    else
                        photo.IsMain=false;

                    photo.Url = "http://localhost:5000/MyImages/"+DbfileName+extention;
                    //photo.UserId=user.Id;
                    photo.DateAdded = DateTime.Now;
                    photo.Description = "this is my description";
                    user.Photos.Add(photo);
                    
                    if(await _datingService.SaveAll())
                    {
                       // return Ok();
                        return CreatedAtRoute("GetPhoto", new { id = photo.Id}, photo);
                    }   
                } 

                return BadRequest("error happed");
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpPut("{id}/SetMain")]
        public async Task<IActionResult> SetMainPhoto(int userId,int id)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user = await _datingService.GetUserById(userId);

            if(!user.Photos.Any(s=>s.Id == id))
                return Unauthorized();

            var photo = await _datingService.GetPhotoById(id);

            if(photo==null)
            {
                return BadRequest("no photo match id");
            }
            
            if(photo.IsMain)
                return BadRequest("it is aleady main");

            var currentMainPhoto = await _datingService.GetMainPhotoByUserId(userId);
            if(currentMainPhoto!=null)
                currentMainPhoto.IsMain = false;

            photo.IsMain = true;

            if(await _datingService.SaveAll())
                return NoContent();

            return BadRequest("Error Happen");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int userId, int id)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user = await _datingService.GetUserById(userId);

            if(!user.Photos.Any(s=>s.Id == id))
                return Unauthorized();

            var photo = await _datingService.GetPhotoById(id);

            if(photo==null)
            {
                return BadRequest("no photo match id");
            }

            if(photo.IsMain)
                return BadRequest("cannot delete main photo");

            _datingService.Delete(photo);

            if(await _datingService.SaveAll())
                return Ok();

            return BadRequest("Error Happen");
        }
    }
}