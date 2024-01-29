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
            // services.AddDbContext<DataContext>(opt =>
            // {
            //     opt.UseNpgsql(config.GetConnectionString("DefaultConnection"));
            //     // opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            // });
            services.AddDbContext<DataContext>(options =>
{
    var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

    string connStr;

    // Depending on if in development or production, use either FlyIO
    // connection string, or development connection string from env var.
    if (env == "Development")
    {
        // Use connection string from file.
        connStr = config.GetConnectionString("DefaultConnection");
    }
    else
    {
        // Use connection string provided at runtime by FlyIO.
        var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

        // Parse connection URL to connection string for Npgsql
        connUrl = connUrl.Replace("postgres://", string.Empty);
        var pgUserPass = connUrl.Split("@")[0];
        var pgHostPortDb = connUrl.Split("@")[1];
        var pgHostPort = pgHostPortDb.Split("/")[0];
        var pgDb = pgHostPortDb.Split("/")[1];
        var pgUser = pgUserPass.Split(":")[0];
        var pgPass = pgUserPass.Split(":")[1];
        var pgHost = pgHostPort.Split(":")[0];
        var pgPort = pgHostPort.Split(":")[1];

        connStr = $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb};";
    }

    // Whether the connection string came from the local development configuration file
    // or from the environment variable from FlyIO, use it to set up your DbContext.
    options.UseNpgsql(connStr);
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