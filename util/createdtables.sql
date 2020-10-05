CREATE TABLE SERVICE_TYPE(
	service_type_id TINYINT NOT NULL AUTO_INCREMENT,
    service_type_Name VARCHAR(30) NOT NULL,
    PRIMARY KEY(service_type_id)
);
INSERT INTO SERVICE_TYPE VALUES(1, 'Main Wash');
INSERT INTO SERVICE_TYPE VALUES(2, 'Extra Wash');

CREATE TABLE SERVICE(
   service_id TINYINT NOT NULL AUTO_INCREMENT,
   service_name VARCHAR(30) NOT NULL,
   service_price FLOAT(7,2) NOT NULL,
   service_type_id TINYINT NOT NULL ,
   PRIMARY KEY(service_id),
   FOREIGN KEY(service_type_id) REFERENCES SERVICE_TYPE(service_type_id)
);
INSERT INTO  SERVICE VALUES(1,'Platin', 17.50, 1);
INSERT INTO  SERVICE VALUES(2,'Gold', 12.50, 1);
INSERT INTO  SERVICE VALUES(3,'Silber', 9.50 , 1);
INSERT INTO  SERVICE VALUES(4,'Bronze', 7.50 , 1);
INSERT INTO  SERVICE VALUES(5,'Felgenreinigung', 5.00 , 2);
INSERT INTO  SERVICE VALUES(6,'Unterboden', 3.00 , 2);
INSERT INTO  SERVICE VALUES(7,'Nanowachs', 3.00 , 2);
INSERT INTO  SERVICE VALUES(8,'Handtuch', 3.00 , 2);

CREATE TABLE JOB(
	job_id TINYINT NOT NULL,
    job_title VARCHAR(30) NOT NULL,
    PRIMARY KEY(job_id)
);
INSERT INTO JOB VALUES(1, 'Manager');
INSERT INTO JOB VALUES(2, 'Kassierer');

CREATE TABLE EMPLOYEE(
    employee_id TINYINT NOT NULL AUTO_INCREMENT,
	first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    address varchar(50) NOT NULL,
     city varchar(50) NOT NULL,
     state varchar(20) NOT NULL,
     phone varchar(50) NOT NULL,
     username varchar(50) NOT NULL,
     pass_word varchar(300) NOT NULL,
    date_of_birth DATE NOT NULL,
    date_hired DATE NOT NULL,
    end_date DATE DEFAULT NULL,
    salary DOUBLE(8,2) NOT NULL,
    job_id TINYINT NOT NULL,
    PRIMARY KEY(employee_id),
    FOREIGN KEY(job_id) REFERENCES JOB(job_id)
);
INSERT INTO EMPLOYEE VALUES(1,'Thomas', 'Müller','Vogel Str','Nürnberg','Bayern','123-456-7895','muelleth001',
                            'Anexample','1984-02-03','2015-09-16',null,46000.00,1);
INSERT INTO EMPLOYEE VALUES(2,'Sara', 'Wagner','IMbiss Str','Nürnberg','Bayern','123-456-7895','wagnesa005',
                            'Anexample','1994-12-03-','2019-08-13',null,15000.00,2);
CREATE TABLE CUSTOMER(
	customer_id TINYINT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    PRIMARY KEY(customer_id)
);
INSERT INTO CUSTOMER VALUES(1, 'Peter','Jonas', '1980-05-29');
INSERT INTO CUSTOMER VALUES(2, 'Marcel','Siegmund', '1970-10-12');

CREATE TABLE CARD(
	card_id BIGINT NOT NULL ,
    customer_id TINYINT NOT NULL ,
    amount_in_card FLOAT(7,2) NOT NULL,
    expiry_date DATE NOT NULL,
    PRIMARY KEY(card_id),
    FOREIGN KEY(customer_id) references CUSTOMER(customer_id)
);
INSERT INTO CARD VALUES(10000001, 1,100, '2023-05-29');
INSERT INTO CARD VALUES(10000002, 2,50, '2022-02-12');
  
CREATE TABLE PAYMENT_METHOD(
	payment_id TINYINT NOT NULL AUTO_INCREMENT,
    payment_name VARCHAR(30)  NOT NULL,
	PRIMARY KEY(payment_id)
);
INSERT INTO PAYMENT_METHOD VALUES(1, 'Bar Zahlung');
INSERT INTO PAYMENT_METHOD VALUES(2, 'Prepaid Karte');
CREATE TABLE ORDERSTATUS(
      ticket_status_id TINYINT NOT NULL,
      ticket_status_name VARCHAR(30) NOT NULL,
   PRIMARY KEY(ticket_status_id)
);
INSERT INTO ORDERSTATUS VALUES(1, 'bought');
INSERT INTO ORDERSTATUS VALUES(2, 'cancelled');

CREATE TABLE TICKETSOLD(
    ticket_id BIGINT NOT NULL,
	service_id TINYINT NOT NULL ,
     employee_id TINYINT NOT NULL,
     time_bought DATETIME NOT NULL,
     ticket_status_id TINYINT  NOT NULL,
     card_id BIGINT ,
     payment_id TINYINT NOT NULL,
     PRIMARY KEY(ticket_id),
     FOREIGN KEY(service_id) REFERENCES SERVICE(service_id), 
     FOREIGN KEY(employee_id) REFERENCES EMPLOYEE(employee_id),
      FOREIGN KEY(card_id) REFERENCES CARD(card_id) ,
      FOREIGN KEY(payment_id) REFERENCES PAYMENT_METHOD(payment_id),
       FOREIGN KEY(ticket_status_id) REFERENCES ORDERSTATUS(ticket_status_id)
);




