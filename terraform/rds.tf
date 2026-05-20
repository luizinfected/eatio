resource "aws_db_instance" "eatio_db" {
  identifier = "eatio-db"
  instance_class = "db.t3.micro"
  allocated_storage = "3"
  db_name = "eatio_db"
  username = var.DB_USERNAME
  password = var.DB_PASSWORD
  engine = "postgres"
  engine_version = "15"
  skip_final_snapshot = true
}

output "db_endpoint" {
  value = aws_db_instance.eatio_db.endpoint
}