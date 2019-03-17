using System;
using System.Security.Claims;
using System.Threading.Tasks;
using dateapp.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace dateapp.API.Helper
{
    public class LogUserActivty : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();

            var userId = int.Parse(resultContext.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var _reposatory = resultContext.HttpContext.RequestServices.GetService<IDatingRepository>();

            var user = await _reposatory.GetUserById(userId);

            user.LastActive = DateTime.Now;

            await _reposatory.SaveAll();

        }
    }
}