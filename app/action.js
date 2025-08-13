"use server"


const googleScriptURL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;


export const addRegistration = async (formData) => {

    const firstName = formData.get("firstName")
    const lastName = formData.get("lastName")
    const phone = formData.get("phone")
    const email = formData.get("email")

    try {

        const res = await fetch(googleScriptURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName,
                lastName,
                phone,
                email,

            })
        })

        if(!res.ok) {
            throw new Error("Failed to add registration to google spreadsheet")
        }

        return {successMessage: `Success! You have been successfully joined our waiting list!`}

    } catch (error) {
        return {errorMessage: `Ooops! There was a problem with your registration!`}
    }
}


