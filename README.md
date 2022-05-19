## Property Management Portal
 
Property management portal is a web-based java project where house owners and customers can exchange information effectively and inexpensively. This system provides a user-friendly interface, satisfying the needs of the consumers. 

There are three roles in this system- Landlord, Admin, and Tenant.  
 - The landlord is the user who owns the house and wants it to give it for rent. The landlord will upload all the details of the house, including the number of rooms, locality, rent. 
 - Admin manages all the users of the system. 
 - Tenant is the one who is looking for a rental house. She/He can search the house according to the requirements and get the results accordingly.

Dashboard Page for admins:
- Display the last 10 properties rented. // Done
- Display 10 most recent tenants. // Done
- Display total income per location.  // Done
- Add more features as you see fit.

Dashboard Page for landlords:
- Display properties. // Done
- Display total income per location. // Done
- Display 10 properties whose leases end in a month. // Done
- Add more features as you see fit.

####  Functional  Requirements
--- 
* Landlords/Tenants can register to the system.
* Landlords can add properties.
	* Can upload pictures of the property.
	* Optional: Use cloud services like Amazon S3 or Google Cloud Storage.
* Landlords can only see their own properties and manage them.
	* Can unlist the property. // Done
* Landlords and Tenants can filter properties:
	* by occupation.
	* by a number of rooms.
	* by location.
* Tenants can filter properties:
	* by number of rooms.
	*  by location.
* Tenants can rent a property for a specific period of time by paying the amount.
	* You do not need to implement or use any payments method.
	* Refer to Extra Features. 
* Admin can manage tenants and landlords.
*  Admin can Activate/Deactivate landlords and tenants.
* Admin can reset passwords.
* Tenants and landlords can reset their password.
	* Users should follow a password reset link.
* Use [ECharts](https://echarts.apache.org/en/index.html) to create live charts for dashboards:
	* Total income per location. (Pie chart)
	* Number of properties rented in a week per each day. (Line Chart)
	* Add more charts as you see fit.
*   All delete operations should be a soft deletion.

#### Extra Features
You can pass with a Honor Grade by completing all extra features.

| Feature | Points |
|---------|--------|
|<font size="3"> Use Stripe for payment processing</font> | 1 point |
|<font size="3">Use OAuth 2.0 and OpenId for authorization and authentication with KeyCloak.</font> |2 points|
|<font size="3">Send notifications. Refer to notifications.</font> |1 point|
|<font size="3">Create a deployment-ready docker image.</font> |1 point|


#### Notifications
---
* PropertyRented: To the landloard when his/her property is rented.
* NewProperty: To all tenants when a new property is added to the system.

#### Sample Domain Models
---

Followings are the sample domain models. You may need to modify them and create more domain models.

Property: 
``` 
propertyName: String
address: Address
propertyType: PropertyType
numberOfBedrooms: int
numberOfBathrooms: int
rentAmount: int
securityDepositAmount: int
photos: List<String>
ownedBy : User
lastRentedBy: User
isOccupied: Boolean
isActive: Boolean
startDate: Date
endDate: Date
isDeleted: Boolean
createdAt: Date
updatedAt: Date
deletedAt: Date
data:json
```

Addres: 
``` 
streetAddress: String
city: City
state: State
zipCode: int
isDeleted: Boolean
createdAt: Date
updatedAt: Date
deletedAt: Date
data:json
```
History: 
``` 
id:int
ownerId: String
tenantId:int
price:money
startDate:Date
endDate: Date
propertyId: int

```

User:
```
email: String
firstName: String
lastname: String
password: String
role: Role
LastLoggedInAt: Datetime
active: Boolean
isDeleted: Boolean
createdAt: Date
updatedAt: Date
deletedAt: Date
data:json
```

#### Technical Details
---
* Use Java and Spring Boot framework for the backend project.
* Use React framework for the frontend project.
* Use n-tier software architecture model.
* PostgreSQL is recommended as a Relational Database system.
* Populate your database with dummy data using `data.sql`.
	* Prepare your dummy data for testing and presentation.
* If necessary, change isolation levels.
* If necessary, change Fetch mode.


#### Submission
---
* Submit a detailed project plan for your daily performance (day/task/time) and submit it with your code.
* Fork this repository and push your changes.
* Once you finished your project, send a Pull Request. (Send only one Pull Request once you finish the assignment.)
* Get ready for your project presentation on Thursday May 19th at 1:30 PM.
* Project will be evaluated based on your code quality. It is possible that I will need to schedule meetings with some students about their source-code.

#### Important Notes
---
 * You are not allowed to share codes with your classmates. If detected, you will get NC.
 
* Remember to respect the code honor submission policy. All written code must be original. Presenting something as one’s own work when it came from another source is plagiarism and is forbidden.
    
* Plagiarism is a very serious thing in all American academic institutions and is guarded against vigilantly by every professor.
 

