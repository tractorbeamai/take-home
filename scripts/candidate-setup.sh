#!/usr/bin/env bash
# Creates a per-candidate IAM user with Bedrock invoke-only access.
# Usage: ./candidate-setup.sh <candidate-name>
# Requires: AWS_PROFILE=sandbox

set -euo pipefail

CANDIDATE="${1:?Usage: $0 <candidate-name>}"
USER_NAME="hiring-candidate-${CANDIDATE}"
POLICY_ARN=""

export AWS_PROFILE=sandbox

echo "Creating IAM user: ${USER_NAME}"
aws iam create-user --user-name "${USER_NAME}"

echo "Attaching inline policy (bedrock:InvokeModel only)"
aws iam put-user-policy \
  --user-name "${USER_NAME}" \
  --policy-name "BedrockInvokeOnly" \
  --policy-document '{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": [
          "bedrock:InvokeModel",
          "bedrock:InvokeModelWithResponseStream"
        ],
        "Resource": "arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-5-sonnet-*"
      }
    ]
  }'

echo "Generating access key"
aws iam create-access-key --user-name "${USER_NAME}" --output json | \
  jq -r '"AWS_ACCESS_KEY_ID=\(.AccessKey.AccessKeyId)\nAWS_SECRET_ACCESS_KEY=\(.AccessKey.SecretAccessKey)\nAWS_REGION=us-east-1"'

echo ""
echo "Done. Send the credentials above to the candidate."
echo "To clean up after the exercise: ./candidate-teardown.sh ${CANDIDATE}"
