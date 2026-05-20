resource "aws_cloudwatch_event_bus" "eatio-event-bus" {
  name = "eatio-eventbus"
  description = "Eatio event bus"
  region = var.AWS_REGION
}

# ===============        USER CREATED        ======================
resource "aws_cloudwatch_event_rule" "user_created_rule" {
  name           = "user-created-rule"
  event_bus_name = aws_cloudwatch_event_bus.eatio-event-bus.name

  event_pattern = jsonencode({
    source = ["eatio.user"]
    detail-type = ["EATIO-USER-CREATED"]
  })
}

resource "aws_cloudwatch_event_target" "user_created_target" {
  rule           = aws_cloudwatch_event_rule.user_created_rule.name
  event_bus_name = aws_cloudwatch_event_bus.eatio-event-bus.name
  target_id      = "user-created-target"
  arn            = aws_sqs_queue.user_created_queue.arn
}
# =================================================================