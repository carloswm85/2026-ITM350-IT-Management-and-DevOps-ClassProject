provider "aws" {
  region = var.region
}

resource "aws_s3_bucket" "example" {
  bucket = "my-unique-bucket-name-12345"
}