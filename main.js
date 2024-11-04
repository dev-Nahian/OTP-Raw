const passwordStepsForm = () => {
    var otp_inputs = document.querySelectorAll(".otp__digit");
    if (otp_inputs) {
      // verification
      otp_inputs.forEach(function (input) {
        input.addEventListener("input", handleNextInput);
        input.addEventListener("keydown", handleBackspace);
      });

      function handleNextInput(event) {
        var currentInput = event.target;
        var index = getIndex(currentInput);

        if (index < otp_inputs.length) {
          currentInput.value = event.data; // Update current input value

          if (event.data && index < otp_inputs.length - 1) {
            otp_inputs[index + 1].focus(); // Move focus to the next input
          }

          updateOtpDisplay(); // Update OTP display
        }
      }

      function handleBackspace(event) {
        var currentInput = event.target;
        var index = getIndex(currentInput);

        if (event.keyCode === 8) {
          if (index > 0 && currentInput.value === "") {
            otp_inputs[index - 1].focus(); // Move focus to the previous input
            otp_inputs[index - 1].value = ""; // Clear previous input value
          } else {
            currentInput.value = ""; // Clear current input value
          }
          updateOtpDisplay(); // Update OTP display
        }
      }

      function updateOtpDisplay() {
        var finalKey = "";
        otp_inputs.forEach(function (input) {
          finalKey += input.value;
        });

        var otpDisplay = document.querySelector("#_otp");
        if (finalKey.length === otp_inputs.length) {
          otpDisplay.classList.replace("_notok", "_ok");
          otpDisplay.innerText = finalKey;
        } else {
          otpDisplay.classList.replace("_ok", "_notok");
          otpDisplay.innerText = finalKey;
        }
      }

      function getIndex(input) {
        return Array.from(otp_inputs).indexOf(input);
      }
    }
};

passwordStepsForm();
