resource "aws_s3_bucket" "eatio-product-images" {
  bucket = "eatio-product-images"

  tags = {
    "Name" = "Default bucket to send files" 
  }
}