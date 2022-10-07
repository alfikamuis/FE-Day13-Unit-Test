# FE-Day13-Unit-Test

<details><summary><b>Code here <<</b></summary>

```sh
it('should return equal value of 2 from listed array user',
    (done: DoneFn) => {
      service.getList().subscribe(value => {
        expect(value.length).toEqual(2);
        done();
      });
    });
```

```sh
it('should return equal value of 3 when add one user',
    (done: DoneFn) => {
      var newUser = { id: 0, nama: 'test', kota: 'test' };
      service.getList().subscribe(value => {
        let editId = service.add(newUser, value);
        service.setUserData(editId);

        expect(value.length).toEqual(3);
        done();
      });
    });
```

```sh
it('should return equal id and equal nama of the updated user',
    (done: DoneFn) => {
      //update data id 1
      var newUser = { id: 1, nama: 'test', kota: 'test' };
      service.getList().subscribe(value => {
        var editId = service.update(newUser, value);

        expect(editId[0].id).toEqual(1);
        expect(editId[0].nama).toEqual('test');
        done();
      });
    });
```

```sh
it('should return empty array when deleted',
    (done: DoneFn) => {
      //delete data id 1
      var deleteUser = { id: 1, nama: '', kota: '' };
      service.getList().subscribe(value => {
        service.delete(deleteUser, value);
        
        expect(value.length).toEqual(1);
        expect(value.filter(item => item.id === 1)).toEqual([]);
        done();
      });
    });
```
</details>

![image](https://user-images.githubusercontent.com/38674801/194540927-ff1ae5e3-560d-4d51-b48e-e5b6373faf0e.png)
