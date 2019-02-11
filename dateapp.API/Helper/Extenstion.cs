using System;
using Microsoft.AspNetCore.Http;

namespace dateapp.API.Helper
{
    public static class Extenstion
    {
        public static void AddApplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }

        public static int CalcAge(this DateTime date)
        {
            var age = DateTime.Today.Year - date.Year; 
            if(date.AddYears(age)>DateTime.Today)
                age--;

                return age;
        }
    }
}