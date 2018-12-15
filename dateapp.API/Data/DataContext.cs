using Microsoft.EntityFrameworkCore;
using dateapp.API.Models;

namespace dateapp.API.Data
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext> options ) : base (options) {}
        public DbSet<Value> Values{get;set;}
        public DbSet<User> Users{get;set;}
    }
}