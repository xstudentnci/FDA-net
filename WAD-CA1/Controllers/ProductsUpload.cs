using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace WAD_CA1.Controllers
{
    public class ProductsUpload : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost("UploadFile")]
        //[DisableFormValueModelBinding]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> UploadFile()
        {
            if (HttpContext.Request.Form.Files[0] == null)
            {
                return Ok("No file selected for upload.");
            }

            var filePath = Path.GetTempFileName();

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                var file = HttpContext.Request.Form.Files[0];
                await file.CopyToAsync(stream);
            }

            return Ok("All good");
        }
    }
}
