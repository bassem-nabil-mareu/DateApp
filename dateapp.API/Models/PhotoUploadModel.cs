using System;
using Microsoft.AspNetCore.Http;

namespace dateapp.API.Models
{
    public class PhotoUploadModel
    {
        public string Url {get;set;}
        public string Descrition {get;set;}
        public DateTime CreatedOn {get;set;}
        public string Id {get;set;}
        public IFormFile File {get;set;}
    } 
}