using System;
using System.ComponentModel.DataAnnotations;

namespace dateapp.API.Models
{
    public class UserModel
    {
        public UserModel()
        {
            LastActive = DateTime.Now;
            CreatedOn = DateTime.Now;
        }
        public int Id { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public string KnownAs { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }
        public DateTime LastActive { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}