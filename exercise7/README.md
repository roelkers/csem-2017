# Exercise 7

Submission deadline: 17.01.2018, end of day

## Cloud Security Questions (50%)

For answering the following questions, please consult the AWS documentation and/or relevant whitepapers from https://aws.amazon.com/whitepapers/#security

Please provide your answers as text in the answers.txt file or alternatively as a PDF document.

Each question should be shortly answered (3-5 sentences per answer). Provide answers in your own words.

### Question 1 - AWS EC2

How can you mitigate the risk of port scanning as an attack vector on your EC2 instances?

### Question 2 - AWS EBS

State two mechanisms to improve your Elastic Block Storage (EBS) volumes’ dependability in terms of durability and/or security.

### Question 3 - AWS S3

How can you control access to S3 buckets and objects?

### Question 4 - AWS SES

How can you make authenticated SMTP email requests using Amazon Simple Email Service (SES) with the DomainKeys Identified Mail (DKIM) mechanism?

### Question 5 - AWS EMR

Which security settings are automatically applied whenever you launch an Elastic Map Reduce (EMR) cluster?

## Cloud Architecture Question (50%)

You are a system architect at a German company that wants to build applications on a hybrid (public-private) cloud architecture.

You are given the following information:

a) User data must be stored securely on an on-premise private cloud due to regulatory industry requirements. Other data can be stored on a public cloud, but must also be secured appropriately to prevent unauthorized access. The connection between private and public cloud must be secured as well.

b) Applications are web applications built with JavaScript/NodeJS and need a relational database as well as a scalable key-value database to store application data. User data is stored in a relational database.

c) Applications need to exchange data with one another, preferably through a messaging system.

d) Some applications have high scalability and high availability requirements.

e) Performance of the applications should be comparable to state-of-the-art web applications (i.e., ideally subsecond latency).

Given this information, please provide a solution architecture and a technology recommendation for designing and building the system architecture.

Please describe your solution using text (and optionally architecture sketches / diagrams). Submit as txt or PDF file.