jQuery(document).ready(function() {

    getAppNames()

    jQuery(".appliance select").change(function() {
        jQuery('#add, #calc, .appliance p').show()
    })

});


//--//


function getAppNames() {

    try {

        contract.methods.getAppNames().call((err, appliances) => {

            jQuery.each(appliances, function(i, appliance) {
                jQuery('.appliance select').append(jQuery('<option>', {
                    value: appliance,
                    text: appliance
                }))
            })

            jQuery('.appliance select option:first').text('Choose Appliance')
        })

    } catch (error) {
        jQuery("#result").html('<span class="badge badge-pill badge-danger p-2">Something Went Wrong</span>')
    }

}

function addMore() {

    const lst_appliance = jQuery('.appliance:last').clone()
    lst_appliance.find("input").val("1")

    jQuery("#add").before(lst_appliance)
}

function getSlctdApps() {

    let slctedApps = []

    const appliances = jQuery(".appliance")

    jQuery.each(appliances, function() {

        let crntName = jQuery(this).find("option:selected").val()

        let crntQty = Number(jQuery(this).find("input").val())

        if (crntName != 0 && crntQty != 0) {
            slctedApps.push({
                name: crntName,
                qty: crntQty
            })
        }
    })

    return slctedApps

}

function showResults(result = null) {

    jQuery(".spinner-border").hide()
    jQuery("#result").removeAttr('hidden')

    if (result != null) {

        jQuery("#result").html('<span class="badge-pill badge-success p-1"><em>Your Loads = </em><strong>' + result / 1000 + '</strong> <small> kilovolt-ampere (kVA)</small></span>')


    } else {
        jQuery("#result").html('<span class="badge badge-pill badge-danger p-2">Something Went Wrong</span>')

    }
}

function calcLoads(slctedApps) {


    if (slctedApps.length > 0) {

        jQuery(".spinner-border").show()

        try {

            contract.methods.calcAppLoads(slctedApps).call((err, totalLoads) => {

                if (totalLoads > 0) {

                    showResults(totalLoads)

                } else {
                    showResults()
                }

            })

        } catch (error) {
            showResults()
        }

    } else {
        alert("Please Select Appliance(s) and quantity shold be at least 1")
    }

}
