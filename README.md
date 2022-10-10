# FE-Day13-Unit-Test

<details><summary><b>Login test code here <<</b></summary>

```sh
it('should return registered object',
    inject(
      [HttpTestingController, AuthService],
      (httpMock: HttpTestingController, authService: AuthService) => {
      
        authService.signUp(mockUsers).subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Response:
              expect(event.body).toEqual(mockUsers);
          }
        });

        const mockReq = httpMock.expectOne(authService.endpoint + "/register-user");

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockUsers);

        httpMock.verify();
      }
    )
  );
```

```sh
it('should return objects user by id',
    inject(
      [HttpTestingController, AuthService],
      (httpMock: HttpTestingController, authService: AuthService) => {

        authService.getUserProfile(1).subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Response:
              expect(event.body).toEqual(mockUsers);
          }
        });

        const mockReq = httpMock.expectOne(authService.endpoint + "/user-profile/"+1);

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockUsers);

        httpMock.verify();
      }
    )
  );
```

```sh
it('should return stored token from localStorage while login',
    () => {
      localStorage.setItem('access_token', 'hasdyqwuy12r3hg');
      expect(service.getToken()).toEqual('hasdyqwuy12r3hg');
    });
```

```sh
it('should return true while user still login',
    () => {
      localStorage.setItem('access_token', 'hasdyqwuy12r3hg');
      expect(service.isLoggedIn).toEqual(true);
    });
```

```sh
it('should return empty token from localStorage while logout',
    () => {
      localStorage.removeItem('access_token');
      expect(service.doLogout()).toBeNull;
    });
```
</details>

<details><summary><b>Passanger code here <<</b></summary>

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

![image](https://user-images.githubusercontent.com/38674801/194896097-646ecd41-efca-49a5-b5b1-c415ab77ed0d.png)
![image](https://user-images.githubusercontent.com/38674801/194895987-9b09d472-b5fe-4bef-90c2-a1063429f415.png)

