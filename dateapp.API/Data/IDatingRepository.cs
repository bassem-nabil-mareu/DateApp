using System.Collections.Generic;
using System.Threading.Tasks;
using dateapp.API.Models;

namespace dateapp.API.Data
{
    public interface IDatingRepository
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();
        Task<IEnumerable<User>> GetUsers();
        Task<User> GetUserById(int id);
        Task<Photo> GetPhotoById(int photoId);
        Task<Photo> GetMainPhotoByUserId(int userId);
    }
}