
describe(' test get API planet', () => {

    test('should be show first planet name called Tatooine', () => {
        const planet = await getPlanetSwapi(1);
        expect(planet.name).toMatch("Tatooine");
    });

    test('should be show resident list of  Tatooine planet ', () => {
        const planet = await getPlanetSwapi(1);
        expect(planet.residents.length).toBe(10);
    });

});