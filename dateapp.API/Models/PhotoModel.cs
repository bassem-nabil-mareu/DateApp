using System;

namespace dateapp.API.Models
{
    public class PhotoModel
    {
        public int id {get;set;}
        public string Url {get;set;}
        public string Description {get;set;}
        public DateTime DateAdded {get;set;}
        public bool IsMain {get;set;}
    }
}