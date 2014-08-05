# jQuery validable

Basic validation compatible with older browsers.

The script prevents from sending an invalid form. Validation constraints are defined as class of the input elements. Supported HTML elements are:
* input (text, password, checkbox, radio)
* textarea
* select

## Validation rules

| Class         | Explanation
| ------------- |:-----------------------------------------------------------------:|
| required      | Makes field compulsory
| zipcode       | Requires a valid Polish zip-code in format 00-000
| email			| Requires a valid email
| date			| Requires a valid date in format DD-MM-YYYY
| phonenumber	| Requires a valid 9 digits long (11 with country code) phone number
| numeric		| Requires a valid numeric calue

If a field is found to be not validated, an `.invalid` class is being added to such element untill the value of the input is being corrected. The same `.invalid` class is being added for `label` related to the input (must have a proper `for` attribute).

## Usage

```html
<style>
.invalid {
	color: red;
	border-color: red;
}
</style>

<form class="validable" method="post" action="">
	<p class="validation_error" style="display: none">The input is not valid</p>
	<label for="email_input">Email:</label>
	<input type="text" id="email_input" name="email" class="required email">
	<input type="submit" name="submit" value="submit">
</form>

<script type="text/javascript" src="jquery.validable.js"></script>
<script type="text/javascript">
$(document).ready(function() {
    $('form.validable').validable();
});
</script>
```

This code comes from PepisCMS and dates back 2010 and might be a bit outdated.