$(document).ready(function () {
  $("#button-design").on("click", ".design-button", function () {
    $(".design-button").removeClass("btn-outline");

    $(this).addClass("btn-outline");

    const buttonValue = $(this).attr("value");

    $(".take-decision-button").css("text-decoration", "none");

    if (buttonValue === "Plainline" || buttonValue === "Lineicon") {
      $(".take-decision-button").css("text-decoration", "underline");
      $(".take-decision-button").css("border", "none");
    }
    if (buttonValue === "Lineicon") {
      $(".take-decision-button").css("border", "none");
      $(".take-decision-button").html(
        "Take Decision <i class='fas fa-caret-right'></i>"
      );
    }

    $(".take-decision-button").css({
      "background-color": $(this).css("background-color"),
      color: $(this).css("color"),
      "border-radius": $(this).css("border-radius"),
      padding: $(this).css("padding"),
      "font-size": $(this).css("font-size"),
    });
  });

  $("#add-new-decision").on("click", function () {
    const newDecisionHtml = `
      <div class="ms-4 w-100 pay-bg decision-bg d-flex align-items-center mb-3 p-3">
        <div class="">
          <div class="d-flex align-items-center mb-2">
            <strong contenteditable="true">New Decision</strong>
          </div>
          <p contenteditable="true" style="font-size: 13px">
            Describe the new decision here.
          </p>
        </div>
        <button class="btn ms-auto btn-outline-warning px-4 take-decision-button">
          Take Decision 
        </button>
        <span style="cursor: pointer" class="ms-4 me-3 text-secondary">
          <i class="fa fa-trash"></i>
        </span>
      </div>
    `;

    $("#decisions-container").append(newDecisionHtml);
  });

  $("#save-decisions").on("click", function () {
    const decisions = [];
    $("#decisions-container .decision-bg").each(function () {
      const decisionText = $(this).find("strong").text();
      const decisionDescription = $(this).find("p").text();
      decisions.push({ decisionText, decisionDescription });
    });

    $.ajax({
      url: "https://64cc86e02eafdcdc8519ed7a.mockapi.io/employee/simpencil",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ decisions }),
      success: function (response) {
        alert("Decisions saved successfully");
      },
      error: function (error) {
        console.error("Error saving decisions:", error);
      },
    });
  });

  $("#decisions-container").on("click", ".fa-trash", function () {
    $(this).closest(".decision-bg").remove();
  });
});
