/***
* DEV NOTES *
* URL: https://tempusdominus.github.io/bootstrap-4/Usage/ *
***/

bsdatetimepicker

default method to initialize date time picker is:

$('#datetimepicker1').datetimepicker();


but one old jquery plugin used in peopledesk already using this method to initilize. to avoid it please use following methode to initialize datetimepicker.

$('#datetimepicker1').bsdatetimepicker();


