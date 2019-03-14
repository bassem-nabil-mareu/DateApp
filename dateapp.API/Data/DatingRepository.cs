using System.Collections.Generic;
using System.Threading.Tasks;
using dateapp.API.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace dateapp.API.Data
{
    public class DatingRepository : IDatingRepository
    {
        private readonly DataContext _context;

        public DatingRepository(DataContext context)
        {
            this._context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Photo> GetMainPhotoByUserId(int userId)
        {
            return await _context.Photos.Where(c=>c.UserId==userId).FirstOrDefaultAsync(c=>c.IsMain==true);
        }

        public async Task<Photo> GetPhotoById(int photoId)
        {
            return await _context.Photos.FirstOrDefaultAsync(s=>s.Id==photoId);
        }

        public async Task<User> GetUserById(int id)
        {
            var user = await _context.Users.Include(e=>e.Photos)
                    .FirstOrDefaultAsync(e=>e.Id==id);

            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _context.Users
                    .Include(w=>w.Photos).ToListAsync();

            return users;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync()>0;
        }
    }
}