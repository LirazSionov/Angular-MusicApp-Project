using System.Threading.Tasks;
using API.Helpers;
using API.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
namespace API.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly Cloudinary _cloudinary;
        public PhotoService(IOptions<CloudinarySettings> config)
        {
            var acc=new Account(
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );
            _cloudinary=new Cloudinary(acc);
        }

        public async Task<DeletionResult> DeletePhotoAsync(string publicId)
        {
            var deleteParams=new DeletionParams(publicId);
            var result=await _cloudinary.DestroyAsync(deleteParams);
            return result;      
        }

        public async Task<ImageUploadResult> UploadPhotoAsync(IFormFile file)
        {
             var uploadResult=new ImageUploadResult();
            if(file.Length>0){
                using var strem=file.OpenReadStream();
                var uploadParams=new ImageUploadParams(){
                    File=new FileDescription(file.FileName, strem),
                    Transformation=new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                };
               uploadResult=await _cloudinary.UploadAsync(uploadParams);
            }
            return uploadResult;
        }
    }
}