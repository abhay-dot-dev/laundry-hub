export const validateOrder = (services, address, phone) => {

    // Validate services array
    if (!Array.isArray(services) || services.length === 0) {
        return "Please select at least one service!";
    }

    // Validate individual service objects
    const invalidService = services.some(
        (service) =>
            !service ||
            typeof service !== 'object' ||
            Array.isArray(service) ||
            typeof service.serviceName !== 'string' ||
            !service.serviceName.trim()
    );

    if (invalidService) {
        return "Invalid service selection!";
    }

    // Validate duplicate services
    const serviceNames = services.map(
        (service) => service.serviceName.trim().toLowerCase()
    );

    if (new Set(serviceNames).size !== serviceNames.length) {
        return "Duplicate services are not allowed!";
    }

    // Validate address and phone
    if (
        typeof address !== 'string' ||
        !address.trim() ||
        typeof phone !== 'string' ||
        !phone.trim()
    ) {
        return "Address and phone are required!";
    }

    // Validate Indian phone number
    if (!/^[6-9]\d{9}$/.test(phone.trim())) {
        return "Please enter a valid 10-digit Indian phone number!";
    }

    return null;
};