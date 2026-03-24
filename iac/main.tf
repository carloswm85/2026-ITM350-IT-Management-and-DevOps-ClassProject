provider "aws" {
  region = "us-west-1"
}

data "aws_ssm_parameter" "amazon_linux" {
  name = "/aws/service/ami-amazon-linux-latest/amzn2-ami-hvm-x86_64-gp2"
}

resource "aws_instance" "example" {
  ami           = data.aws_ssm_parameter.amazon_linux.value
  instance_type = "t2.micro"

  tags = {
    Name = "terraform-created-instance"
  }
}