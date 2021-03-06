import {takeLatest, call, put} from 'redux-saga/effects';
import {firestore, convertCollectionSnapshotToMap} from '../../components/firebase/firebase-utils';
import {fetchCollectionSuccess, fetchCollectionFailure} from './shop.actions';

export function* fetchCollectionAsync() {
    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionSnapshotToMap, snapshot.docs);
        yield put(fetchCollectionSuccess(collectionsMap));

    }catch(error) {
        yield put(fetchCollectionFailure(error.message))
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest("FETCH_COLLECTIONS_START",
        fetchCollectionAsync
    );
}