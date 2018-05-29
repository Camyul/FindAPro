using FindAPro.Data.Contracts;
using FindAPro.Data.Model;
using Microsoft.AspNetCore.Identity;

namespace FindAPro.Data
{
    public class DbInitializer : IDbInitializer
    {
        private readonly MsSqlDbContext context;
        private readonly UserManager<User> userManager;
        private readonly RoleManager<IdentityRole> roleManager;

        public DbInitializer(MsSqlDbContext context, UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            this.context = context;
            this.userManager = userManager;
            this.roleManager = roleManager;
        }


        //This example just creates an Administrator role and one Admin users
        public void Initialize()
        {
            //Create database schema if none exists
            this.context.Database.EnsureCreated();

            //Create the Administartor Role
            if (!roleManager.RoleExistsAsync("Administrator").Result)
            {
                IdentityRole roleAdministrator = new IdentityRole();
                roleAdministrator.Name = "Administrator";

                IdentityResult roleResult = roleManager.CreateAsync(roleAdministrator).Result;

                if (!roleResult.Succeeded)
                {
                    return;
                }
            }

            //Create the default Admin account and apply the Administrator role
            string email = "test@test.com";
            string password = "Test12!";

            User user = new User { UserName = email, Email = email };

            this.userManager.CreateAsync(user, password).Wait();

            this.userManager.AddToRoleAsync(user, "Administrator").Wait();
        }
    }
}
