﻿using HRIS.Exceptions;
using HRIS.Services.UserService;
using HRIS.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
using System.Security.Cryptography.Xml;

namespace HRIS.Controllers
{
    [Authorize]
    [ApiController]
    [Route("/api/user")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IUserService _userService;

        public UserController(ILogger<UserController> logger, IUserService userService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _userService = userService ?? throw new ArgumentNullException(nameof(logger));
        }

        [HttpGet]
        [Produces("application/json")]
        public async Task<IActionResult> GetUserProfile()
        {
            try
            {
                var userId = UserClaim.GetCurrentUser(HttpContext) ??
                    throw new UserNotFoundException("Invalid user.");

                var response = await _userService.GetUserProfile(userId);
                return Ok(response);
            }
            catch (UserNotFoundException ex)
            {
                _logger.LogError("An error occurred while attempting to get user information.", ex);
                return NotFound("An error occurred while finding user.");
            }
            catch (Exception ex)
            {
                _logger.LogCritical("An error occurred while attempting to get user data.", ex);
                return Problem("An error occurred while getting user profile. Please try again later.");
            }
        }

        [HttpPut]
        [Produces("application/json")]
        public Task<IActionResult> UpdateUserProfile()
        {
            throw new ArgumentNullException();
        }
    }
}
