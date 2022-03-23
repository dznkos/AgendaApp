
import { authReducer } from "../../reducers/authReducer"
import { types } from "../../types/types";

describe('Pruebas en authReducer.js', () => { 

  test('debe de realizar el login authReducer', () => { 
    const initState = {};

    const action = {
      type: types.login,
      payload: {
        uid: '123asd',
        displayName: 'Ceres'
      }
    }
    const state = authReducer( initState, action );

    expect( state ).toEqual( {
      uid: '123asd',
      name: 'Ceres'
    } )

  })

  test('debe de realizar el logout authReducer', () => { 


    const initState = {
        uid: '123asd',
        displayName: 'Ceres'
      }
    ;

    const action = {
      type: types.logout,
    }


    const state = authReducer( initState, action );

    expect( state ).toEqual( {} )

  })


  test('debe de ejecutar default y devolver initState', () => { 

    const initState = {
        uid: '123',
        displayName: 'Ceres'
      }
    ;

    const action = {
      type: types.findall,
    }


    const state = authReducer( initState, action );

    expect( state ).toEqual( initState )

  })

})