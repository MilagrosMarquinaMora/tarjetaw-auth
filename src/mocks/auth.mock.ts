export const documentTypeMock = [
    {
        id: 1,
        name: 'Documento nacional de identidad',
        abbreviation: 'Dni',
        condition: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 2,
        name: 'Cédula de extranjería',
        abbreviation: 'CE',
        condition: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
]

export const userTokenMock = {
    id: 1,
    name: 'Juan',
    lastName: 'Perez',
    documentType: 1,
    nroDocument: '12345678',
    cell: '123456789',
    advisoryCode: '123456'
}