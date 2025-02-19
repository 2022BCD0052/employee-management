#!/bin/bash

API_URL="http://localhost:3000/api/employees"

echo "\U0001f680 Adding 10 real employees..."

# Define real employee data
employees=(
  "John Doe|Engineering|Software Engineer"
  "Alice Johnson|Marketing|Marketing Manager"
  "Michael Smith|HR|HR Manager"
  "Sarah Williams|Finance|Accountant"
  "David Brown|IT|System Administrator"
  "Emma Davis|Sales|Sales Executive"
  "Robert Wilson|Customer Support|Support Specialist"
  "Olivia Taylor|Operations|Operations Manager"
  "James Anderson|Legal|Legal Advisor"
  "Sophia Martinez|Product|Product Manager"
)

# Loop through employee data and send API requests
for employee in "${employees[@]}"; do
  IFS='|' read -r name department position <<< "$employee"

  curl -X POST $API_URL \
    -H "Content-Type: application/json" \
    --data "{
      \"name\": \"$name\",
      \"department\": \"$department\",
      \"position\": \"$position\"
    }"
  echo ""  # Print a new line after each request
done

echo "\u2705 Successfully added 10 real employees!"
