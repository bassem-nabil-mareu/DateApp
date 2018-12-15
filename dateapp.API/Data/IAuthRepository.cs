using System.Threading.Tasks;
using dateapp.API.Models;

namespace dateapp.API.Data
{
    public interface IAuthRepository
    {
         Task<User> Register(User user, string password);
         Task<User> Login(string userName, string password);
         Task<bool> UserExists(string userName);
    }
}