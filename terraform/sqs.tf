resource "aws_sqs_queue" "user_created_queue" {
  name = "user-created-queue"
}

output "sqs_queue_url" {
  value = aws_sqs_queue.user_created_queue.url
}