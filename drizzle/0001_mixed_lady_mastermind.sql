CREATE TABLE `applications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`jobId` int NOT NULL,
	`professionalId` int NOT NULL,
	`status` enum('new','shortlisted','interview','hired','rejected') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `applications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `attendance` (
	`id` int AUTO_INCREMENT NOT NULL,
	`jobId` int NOT NULL,
	`professionalId` int NOT NULL,
	`qrToken` varchar(180),
	`checkInAt` timestamp,
	`checkOutAt` timestamp,
	`venueVerified` boolean NOT NULL DEFAULT false,
	`issueNote` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `attendance_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`organizerId` int NOT NULL,
	`title` varchar(180) NOT NULL,
	`category` varchar(100) NOT NULL,
	`venueName` varchar(180) NOT NULL,
	`locationAddress` text NOT NULL,
	`city` varchar(100) NOT NULL,
	`latitude` decimal(10,7),
	`longitude` decimal(10,7),
	`eventDate` int NOT NULL,
	`startTime` varchar(20) NOT NULL,
	`endTime` varchar(20) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `job_posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`eventId` int NOT NULL,
	`organizerId` int NOT NULL,
	`role` varchar(160) NOT NULL,
	`description` text,
	`skills` text,
	`openings` int NOT NULL,
	`payAmount` int NOT NULL,
	`status` enum('draft','live','closed','completed') NOT NULL DEFAULT 'draft',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `job_posts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `organizer_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`organizationName` varchar(180) NOT NULL,
	`organizerType` varchar(120),
	`city` varchar(100),
	`verificationStatus` enum('pending','verified','rejected') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `organizer_profiles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `payments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`jobId` int NOT NULL,
	`professionalId` int NOT NULL,
	`amount` int NOT NULL,
	`status` enum('pending','funded','ready_to_release','released','disputed') NOT NULL DEFAULT 'pending',
	`fundedAt` timestamp,
	`releasedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `payments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `professional_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`displayName` varchar(160) NOT NULL,
	`city` varchar(100),
	`skills` text,
	`languages` text,
	`experienceSummary` text,
	`verificationStatus` enum('pending','verified','rejected') NOT NULL DEFAULT 'pending',
	`rating` decimal(3,2) NOT NULL DEFAULT '0.00',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `professional_profiles_id` PRIMARY KEY(`id`)
);
