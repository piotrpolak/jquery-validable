# jQuery validable

Basic validation compatible with older browser.

The script prevents from sending an invalid form.

This code comes from PepisCMS (2009)

## Validation rules

| Class         | Explanation
| ------------- |:-----------------------------------------------------------------:|
| required      | Makes field compulsory
| zipcode       | Requires a valid Polish zip-code in format 00-000
| email			| Requires a valid email
| date			| Requires a valid date in format DD-MM-YYYY
| phonenumber	| Requires a valid 9 digits long (11 with country code) phone number
| numeric		| Requires a valid numeri calue

## Usage

```
<style>
.invalid {
	color: red;
	border-color: red;
}
</style>

<form class="validable" method="post" action="">
	<p class="validation_error" style="display: none">The input is not valid</p>
	<input type="text" name="email" class="required email">
	<input type="submit" name="submit" value="submit">
</form>

<script type="text/javascript" src="jquery.validable.js"></script>
<script type="text/javascript">
$(document).ready(function() {
    $('form.validable').validable();
});
</script>
```