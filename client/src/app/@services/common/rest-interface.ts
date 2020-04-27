export interface RestInterface {
    ping();

    getAll();

    update(code, object, revision_id);

    create(object);

    destroy(code);

    get(code);
}
