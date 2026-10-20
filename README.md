# Barber & Beauty - Dynamic Full-Stack Reservation System

A production-ready, full-stack appointment scheduling application built with a modern React 18 frontend and a Java Spring Boot REST API backed by MySQL.

The system features real-time time slot availability calculation, double-booking prevention, same-day time filtering using live client system time, and defensive state management.

---

## Key Features

* Real-Time Slot Availability: Dynamically calculates available time slots based on the selected date.
* Double-Booking Prevention: Excludes already reserved slots for any given date from the dropdown selector.
* Same-Day Time Restriction: Automatically filters out past hours when booking for the current day using live system time.
* Full CRUD Operations: Seamless creation, reading, editing, and deletion of appointments.
* State Synchronization: Centralized state in App.jsx (Lifting State Up) ensures immediate updates across components.
* Robust UX Feedback: Custom notification toasts for status alerts and confirmation modals for destructive actions.
* Defensive Architecture: Built with Array.isArray guard clauses and optional chaining to handle asynchronous API responses reliably.

---

## Tech Stack

### Frontend
* Framework: React 18
* Build Tool: Vite
* Language: JavaScript (ES6+)
* State Management: React Hooks (useState, useEffect, Lifting State Up pattern)
* HTTP Client: Fetch API / Axios

### Backend
* Framework: Java 17+ / Spring Boot
* ORM / Persistence: Spring Data JPA / Hibernate
* Database: MySQL (via XAMPP / MariaDB)
* Architecture: RESTful API architecture with decoupled service layer (reservasService.js)

---

## Architecture & Best Practices

* Single Source of Truth: Centralized state management in App.jsx ensures seamless data synchronization between FormularioReserva and ListaReservas.
* Derived State Pattern: Unbooked time slots (horasLibres) are calculated on-the-fly during render rather than stored in redundant state, preventing synchronization bugs.
* Decoupled API Layer: Clear separation of concerns with reservasService.js handling HTTP communication with the Spring Boot REST API.

---

## Getting Started

### Prerequisites

* Node.js (v18.0.0 or higher) & npm
* Java Development Kit (JDK) 17 or higher
* IntelliJ IDEA (or preferred Java IDE)
* XAMPP Control Panel (Apache & MySQL services)

---

### 1. Database & Backend Setup

1. Launch XAMPP Control Panel and start the MySQL service.
2. Open phpMyAdmin (http://localhost/phpmyadmin) and create a database named reservas_db.
3. Open the backend project in IntelliJ IDEA.
4. Verify your src/main/resources/application.properties configuration:

```properties
spring.application.name=backend-reservas
server.port=8080

# Conexión a la base de datos de XAMPP
spring.datasource.url=jdbc:mysql://localhost:3306/reservas_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=

# Driver de MySQL
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA / Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
