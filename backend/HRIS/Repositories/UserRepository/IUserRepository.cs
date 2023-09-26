﻿using HRIS.Models;

namespace HRIS.Repositories.UserRepository
{
    public interface IUserRepository
    {
        Task<User?> GetUserById(Guid id);
    }
}
