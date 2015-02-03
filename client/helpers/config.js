Meteor.startup(function() {
	AccountsEntry.config({
		homeRoute: '/',
		dashboardRoute: '/',
		profileRoute: '/',
		passwordSignupFields: 'USERNAME_AND_EMAIL',
		extraSignUpFields: [{
			field: "displayName",
			label: "Full Name",
			placeholder: "Your Name",
			type: "text",
			required: true
		},
		{
			field: "displayTitle",
			label: "Title",
			placeholder: "Instructor",
			type: "text",
			required: true
		},
		{
			field: "displayBio",
			label: "Bio",
			placeholder: "A bit about yourself, you can add this later if you want.",
			type: "text",
			required: false
		}]
	});
});