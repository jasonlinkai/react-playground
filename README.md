### 總結redux以及context的比較

- 只要是引用了某個context，且被包裹在context provider下，當content更新時, component都會rerender，無論是否使用了context中的值。

- 只要是透過useSelector引用了某個redux值，只要在值有變動的情況下，component就會rerender。

- 如何做到使用redux，並只rerender陣列中的某一項，只需透過React.memo將component包住即可，這樣即使整個陣列參考都被更新了，只要組件新的prop值在與舊值相同，即不觸發無謂的rerender。