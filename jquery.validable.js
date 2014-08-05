/**
 * @author Piotr Polak
 * @version 1.7.1
 * @date 18.07.2013
 * @url https://github.com/piotrpolak/jquery-validation
 * 
 * This file should not be customized
 * 
 * Validation CSS classes: .required, .zipcode, .email, .date, .phonenumber .numeric
 * An .invalid class is added upon unsuccessful validation
 */
(function($) {

    $.fn.validable = function() {

        var formselector = $(this);
        $('.invalid', formselector).removeClass('invalid');

        function isEmailValid(str)
        {
            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (filter.test(str)) {
                // Yay! valid
                return true;
            }
            else
            {
                return false;
            }
        }

        function isZipcodeValid(str)
        {
            var regDate = '^([0-9]{2})-([0-9]{3})$';
            if (str.match(regDate))
            {
                return true;
            }
            return false;
        }

        function isPhoneNumberValid(str)
        {
            var regPhoneNumber = '^([0-9]{9}|[+]{1}[0-9]{11}|[0-9]{11})$';
            if (str.match(regPhoneNumber))
            {
                return true;
            }
            return false;
        }

        function isNumeric(str)
        {
            str = str.replace(',', '.');
            return parseFloat(str) == str;
        }

        function isDateValid(str)
        {
            var regDate = '^(0[1-9]|(1|2)[0-9]|3[0-1]).(0[1-9]{1}|1[0-2]{1}){1}.(19[0-9]{2}|2[0-9]{3})$';
            if (str.match(regDate))
            {
                return true;
            }
            return false;
        }

        var tips = $('.tip');
        function doForms()
        {
            $.each(tips, function(index, element)
            {
                if ($(this).val() == '')
                {
                    $(this).val($(this).data('label'));
                }
                $(this).attr('title', $(this).data('label'));
            });

            tips.focus(function(event) {
                if ($(this).val() == $(this).data('label'))
                    $(this).val('');
            });
            tips.blur(function(event) {
                if ($(this).val() == '')
                {
                    $(this).val($(this).data('label'));
                }
            });
        }
        doForms()
        
        function makeInvalid(field, isValid)
        {
            field = $(field);
            var id = field.attr('id');
            var labelHandle = false;
            if (id)
            {
                labelHandle = $('label[for="' + id + '"]');
            }
            if (isValid)
            {
                field.addClass('invalid');
                if (labelHandle)
                {
                    labelHandle.addClass('invalid');
                }
            }
            else
            {
                field.removeClass('invalid');
                if (labelHandle)
                {
                    labelHandle.removeClass('invalid');
                }
            }
        }

        $(formselector).bind('submit', function() {

            $.each(tips, function(index, element)
            {
                if ($(element).val() == $(element).data('label'))
                {
                    $(element).val('');
                }
            });

            var that = this;
            var valid = true;
            $('input:text:visible, input:password:visible, textarea:visible, select:visible, input:checkbox:visible, input:radio:visible', this).each(function() {

                var field = $(this);

                if (field.hasClass('required'))
                {
                    if (field.is('input:checkbox'))
                    {
                        if (!field.is(':checked'))
                        {
                            makeInvalid(field, true);
                            valid = false;
                        }
                        else
                        {
                            makeInvalid(field, false);
                        }
                    }
                    else if (field.is('input:radio'))
                    {
                        if ($(':checked', field).length == 0)
                        {
                            makeInvalid(field, true);
                            valid = false;
                        }
                        else
                        {
                            makeInvalid(field, false);
                        }
                    }
                    else
                    {
                        var val = field.val();
                        var rel = field.attr('rel');
                        if (val == '' || (rel != '' && val == rel))
                        {
                            makeInvalid(field, true);
                            valid = false;
                        }
                        else
                        {
                            makeInvalid(field, false);
                        }
                    }
                }

                if (field.val())
                {
                    if (field.hasClass('email'))
                    {
                        if (!isEmailValid(field.val()))
                        {
                            makeInvalid(field, true);
                            valid = false;
                        }
                        else
                        {

                            makeInvalid(field, false);
                        }
                    }

                    if (field.hasClass('date'))
                    {
                        if (!isDateValid(field.val()))
                        {
                            makeInvalid(field, true);
                            valid = false;
                        }
                        else
                        {
                            makeInvalid(field, false);
                        }
                    }

                    if (field.hasClass('zipcode'))
                    {
                        if (!isZipcodeValid(field.val()))
                        {
                            makeInvalid(field, true);
                            valid = false;
                        }
                        else
                        {
                            makeInvalid(field, false);
                        }
                    }

                    if (field.hasClass('numeric'))
                    {
                        if (!isNumeric(field.val()))
                        {
                            makeInvalid(field, true);
                            valid = false;
                        }
                        else
                        {
                            makeInvalid(field, false);
                        }
                    }

                    if (field.hasClass('phonenumber'))
                    {
                        val = field.val().toString().replace(' ', '').replace('.', '').replace('-', '').replace('_', '');
                        field.val(val);

                        if (!isPhoneNumberValid(val))
                        {
                            makeInvalid(field, true);
                            valid = false;
                        }
                        else
                        {
                            makeInvalid(field, false);
                        }
                    }
                }

            });
            if (!valid)
            {
                doForms();
                $('.validation_error', that).fadeIn();
                $('.invalid:visible:first').focus();
                fireIninvalidOnKeypress();


                return false;
            }
        });

        function fireIninvalidOnKeypress()
        {
            var that = $(this).parents('form');

            $('.invalid').each(function() {
                $(this).keypress(function() {
                    makeInvalid(this, false);
                    if ($('.invalid:visible').length == 0)
                    {
                        $('.validation_error', that).fadeOut();
                    }
                });
            });
        }

        $(' :input', formselector).each(function() {

            var that = $(this).parents('form');

            $(this).click(function(event) {
                makeInvalid(this, false);
                if ($('.invalid:visible').length == 0)
                {
                    $('.validation_error', that).fadeOut();
                }
            });
            $(this).change(function(event) {
                makeInvalid(this, false);
                if ($('.invalid:visible').length == 0)
                {
                    $('.validation_error', that).fadeOut();
                }
            });
        });
    }
})(jQuery);