using Application.Activities;
using Application.Core;
using Application.Interfaces;
using FluentValidation;
using FluentValidation.AspNetCore;
using Infrastructure.Photos;
using Infrastructure.Security;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServiceExtensions(this IServiceCollection services, IConfiguration config)
        {
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            //connection string
            services.AddDbContext<DataContext>(opt =>
            {
                // opt.UseNpgsql(config.GetConnectionString("DefaultConnection"));
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            //Cros for allow client side to use api
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials()
                    .WithOrigins("http://localhost:3000");
                });
            });

            //service MediatR
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(List.Handler).Assembly));
            // services.AddMediatR(typeof(List.Handler));

            //automapper
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            //validation for model (fludentValidation package)
            services.AddFluentValidationAutoValidation();

            //validation create
            services.AddValidatorsFromAssemblyContaining<Create>();

            //
            services.AddHttpContextAccessor();

            //IServices
            services.AddScoped<IUserAccessor, UserAccerssor>();
            services.AddScoped<IPhotoAccerssor, PhotoAccessor>();
            //Cloudinary
            services.Configure<CloudinarySettings>(config.GetSection("Cloudinary"));

            //SignalR
            services.AddSignalR();

            return services;
        }
    }
}