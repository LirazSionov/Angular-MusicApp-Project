using API.Interfaces;
using API.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection IdentityServices(this IServiceCollection services, IConfiguration config)
        {
           services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options=>{
                options.TokenValidationParameters=new TokenValidationParameters{
                    ValidatIssuerSigningKey=true,
                    IssuerSigningKey=new SymmentricSecurityKey(Encoding.UTF8.GetBytes(_config["TokenKey"])),
                    ValidateIssuer=false,
                    ValidateAudience=false
                };
            });
            return services;
        }
    }
}