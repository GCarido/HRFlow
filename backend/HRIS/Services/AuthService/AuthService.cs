﻿using AutoMapper;
using HRIS.Dtos.AuthDto;
using HRIS.Exceptions;
using HRIS.Models;
using HRIS.Repositories.AuthRepository;
using HRIS.Utils;

namespace HRIS.Services.AuthService
{
    public class AuthService : IAuthService
    {
        private readonly IMapper _mapper;
        private readonly IAuthRepository _authRepository;
        private readonly IConfiguration _configuration;

        public AuthService(IMapper mapper, IAuthRepository authRepository, IConfiguration configuration)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _authRepository = authRepository ?? throw new ArgumentNullException(nameof(authRepository));
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        public async Task<string> RegisterUser(RegisterUserDto request)
        {
            var isEmailExists = await _authRepository.IsEmailExists(request.Email);
            if (isEmailExists)
            {
                throw new UserExistsException("User is already recorded to the database.");
            }

            Password.Encrypt(request.Password, out string passwordHash, out string passwordSalt);

            var newUser = _mapper.Map<User>(request);
            newUser.PasswordHash = passwordHash;
            newUser.PasswordSalt = passwordSalt;
            newUser.Role = "Human Resource";

            var isUserAdded = await _authRepository.AddUser(newUser);
            if (!isUserAdded)
            {
                throw new Exception("Failed to save user information to database.");
            }

            return CodeGenerator.Token(
                _configuration,
                newUser.Id,
                "Human Resource",
                DateTime.Now.AddDays(1));
        }

        public async Task<string> LoginUser(LoginUserDto request)
        {
            var user = await _authRepository.GetUserByEmail(request.Email) ??
                throw new UserNotFoundException("User is not recorded in the database.");

            if (!Password.Verify(user.PasswordHash, request.Password))
            {
                throw new UnauthorizedAccessException("Password does not match with the user's credentials.");
            }

            return CodeGenerator.Token(
                _configuration,
                user.Id,
                "Human Resource",
                DateTime.Now.AddDays(1));
        }

        public async Task<string> ForgotPassword(ForgotPasswordDto request)
        {
            var user = await _authRepository.GetUserByEmail(request.Email);
            if (user is null)
            {
                throw new UserNotFoundException("User is not recorded in the database.");
            }

            var code = CodeGenerator.Digit(6);
            var isUserUpdated = await _authRepository.UpdateUserCode(user, code);
            if (!isUserUpdated)
            {
                throw new Exception("An error occurred while sending OTP code.");
            }

            return await SMTP.SendEmail(_configuration, request.Email, code);
        }

        public async Task<string> VerifyPassword(OTPDto request)
        {
            var user = await _authRepository.GetUserByEmail(request.Email) ??
                throw new UserNotFoundException("User is not recorded in the database.");

            if (!user.PasswordToken.Equals(request.Code))
            {
                throw new UnauthorizedAccessException("Invalid OTP Code.");
            }

            var isUserUpdated = await _authRepository.UpdateUserCode(user, string.Empty);
            if (!isUserUpdated)
            {
                throw new Exception("An error occurred while verifying OTP code.");
            }

            return CodeGenerator.Token(
                _configuration,
                user.Id,
                "Human Resource",
                DateTime.Now.AddDays(1));
        }
    }
}
